import { Geom2, Geom3 } from '@jscad/modeling/src/geometries/types'
import { cameras, controls, drawCommands, entitiesFromSolids, prepareRender } from '@jscad/regl-renderer'
import { cameraState } from '@jscad/regl-renderer/types/cameras/perspectiveCamera'
import { controlsState } from '@jscad/regl-renderer/types/controls/orbitControls'
import * as renderingDefaults from '@jscad/regl-renderer/types/rendering/renderDefaults'
import * as React from 'react'
import { useDrag, usePinch, useWheel } from 'react-use-gesture'
import { InitializationOptions } from 'regl'

import { useAnimationFrame, useKeyPress } from './hooks'

interface RendererProps {
  animate?: boolean
  glOptions?: InitializationOptions
  height?: number
  options?: {
    axisOptions?: {
      show?: boolean
    }
    gridOptions?: {
      show?: boolean
      color?: number[]
      subColor?: number[]
      fadeOut?: boolean
      transparent?: boolean
      size?: number[]
      ticks?: number[]
    }
    renderingOptions?: Partial<typeof renderingDefaults>
    viewerOptions?: {
      initialPosition?: number[]
      panSpeed?: number
      rotateSpeed?: number
      zoomSpeed?: number
    }
  }
  solids: Geom2[] | Geom3[]
  width?: number
}

interface RendererState {
  camera?: typeof cameraState
  controls?: typeof controlsState
  element: HTMLDivElement | null
  inputs: {
    shift: 'up' | 'down'
    mouse: 'up' | 'down'
  }
  panDelta: number[]
  render?: (content: any) => void
  rotateDelta: number[]
  zoomDelta: number
}

const initialProps = ({ animate, glOptions, height, options, solids, width }: RendererProps): RendererProps => {
  return {
    animate: animate || false,
    glOptions,
    height: height || 480,
    options: {
      axisOptions: {
        show: true,
        ...options?.axisOptions,
      },
      gridOptions: {
        show: true,
        color: [0, 0, 0, 1],
        subColor: [0, 0, 1, 0.5],
        fadeOut: false,
        transparent: true,
        size: [144, 144],
        ticks: [12, 1],
        ...options?.gridOptions,
      },
      renderingOptions: {
        background: [0.5, 0.5, 0.5, 1],
        meshColor: [0, 0.6, 1, 1],
        lightColor: [1, 1, 1, 1],
        lightDirection: [0.2, 0.2, 1],
        lightPosition: [100, 200, 100],
        ambientLightAmount: 0.3,
        diffuseLightAmount: 0.89,
        specularLightAmount: 0.16,
        materialShininess: 8.0,
        ...options?.renderingOptions,
      },
      viewerOptions: {
        initialPosition: [45, 45, 45],
        panSpeed: 0.75,
        rotateSpeed: 0.02,
        zoomSpeed: 0.03,
        ...options?.viewerOptions,
      },
    },
    solids: solids || [],
    width: width || 480,
  }
}

const initialState = (options: RendererProps['options']): RendererState => {
  return {
    camera: {
      ...cameras.perspective.defaults,
      position: options?.viewerOptions?.initialPosition,
    },
    controls: controls.orbit.defaults,
    element: null,
    inputs: { mouse: 'up', shift: 'up' },
    panDelta: [0, 0],
    rotateDelta: [0, 0],
    zoomDelta: 0,
  }
}

type RendererAction =
  | { type: 'SET_CAMERA'; payload: RendererState['camera'] }
  | { type: 'SET_CONTROLS'; payload: RendererState['controls'] }
  | { type: 'SET_ELEMENT'; payload: RendererState['element'] }
  | { type: 'SET_INPUTS'; payload: RendererState['inputs'] }
  | { type: 'SET_PAN_DELTA'; payload: RendererState['panDelta'] }
  | { type: 'SET_RENDER'; payload: RendererState['render'] }
  | { type: 'SET_ROTATE_DELTA'; payload: RendererState['rotateDelta'] }
  | { type: 'SET_ZOOM_DELTA'; payload: RendererState['zoomDelta'] }

function reducer(state: RendererState, action: RendererAction): RendererState {
  switch (action.type) {
    case 'SET_CAMERA': {
      if (!state.camera) return { ...state }
      const updated = cameras.perspective.update({
        ...state.camera,
        ...action.payload,
      })
      return {
        ...state,
        camera: { ...action.payload, ...updated },
      }
    }
    case 'SET_CONTROLS': {
      if (!action.payload || !state.camera) return { ...state }
      const updated = controls.orbit.update({
        controls: action.payload,
        camera: state.camera,
      })
      return {
        ...state,
        controls: { ...action.payload, ...updated.controls },
        camera: { ...state.camera, ...updated.camera },
      }
    }
    case 'SET_ELEMENT':
      return { ...state, element: action.payload }
    case 'SET_INPUTS':
      return { ...state, inputs: action.payload }
    case 'SET_PAN_DELTA':
      return { ...state, panDelta: action.payload }
    case 'SET_RENDER':
      return { ...state, render: action.payload }
    case 'SET_ROTATE_DELTA':
      return { ...state, rotateDelta: action.payload }
    case 'SET_ZOOM_DELTA':
      return { ...state, zoomDelta: action.payload }
  }
}

document.addEventListener('gesturestart', e => e.preventDefault())
document.addEventListener('gesturechange', e => e.preventDefault())

const Renderer = React.forwardRef<HTMLDivElement, RendererProps>((props, forwardRef) => {
  const { animate, glOptions, height, options, solids, width } = initialProps(props)
  const [state, dispatch] = React.useReducer(reducer, initialState(options))
  const ref = React.useRef<HTMLDivElement>(null)

  const content = React.useMemo(() => {
    return {
      rendering: options?.renderingOptions,
      drawCommands: {
        drawGrid: drawCommands.drawGrid,
        drawAxis: drawCommands.drawAxis,
        drawMesh: drawCommands.drawMesh,
      },
      entities: [
        {
          visuals: {
            drawCmd: 'drawGrid',
            show: options?.gridOptions?.show,
            color: options?.gridOptions?.color,
            subColor: options?.gridOptions?.subColor,
            fadeOut: options?.gridOptions?.fadeOut,
            transparent: options?.gridOptions?.transparent,
          },
          size: options?.gridOptions?.size,
          ticks: options?.gridOptions?.ticks,
        },
        {
          visuals: {
            drawCmd: 'drawAxis',
            show: options?.axisOptions?.show,
          },
        },
        ...entitiesFromSolids({}, ...solids),
      ],
    }
  }, [
    options?.axisOptions?.show,
    options?.gridOptions?.color,
    options?.gridOptions?.fadeOut,
    options?.gridOptions?.show,
    options?.gridOptions?.size,
    options?.gridOptions?.subColor,
    options?.gridOptions?.ticks,
    options?.gridOptions?.transparent,
    options?.renderingOptions,
    solids,
  ])

  useDrag(
    event => {
      dispatch({
        type: 'SET_INPUTS',
        payload: { ...state.inputs, mouse: event.down ? 'down' : 'up' },
      })
      if (state.inputs.mouse === 'down' && (state.inputs.shift === 'down' || event.touches === 3))
        dispatch({
          type: 'SET_PAN_DELTA',
          payload: [-event.delta[0], event.delta[1]],
        })
      if (state.inputs.mouse === 'down' && state.inputs.shift === 'up' && event.touches === 1)
        dispatch({
          type: 'SET_ROTATE_DELTA',
          payload: [event.delta[0], -event.delta[1]],
        })
    },
    { domTarget: ref || forwardRef },
  )

  usePinch(
    event => {
      if (event.touches === 2) dispatch({ type: 'SET_ZOOM_DELTA', payload: -event.delta[0] })
    },
    { domTarget: ref || forwardRef },
  )

  useWheel(
    event => {
      dispatch({ type: 'SET_ZOOM_DELTA', payload: event.delta[1] })
    },
    { domTarget: ref || forwardRef },
  )

  const onShiftDown = React.useCallback(() => {
    dispatch({
      type: 'SET_INPUTS',
      payload: { ...state.inputs, shift: 'down' },
    })
  }, [state.inputs])

  const onShiftUp = React.useCallback(() => {
    dispatch({
      type: 'SET_INPUTS',
      payload: { ...state.inputs, shift: 'up' },
    })
  }, [state.inputs])

  useKeyPress('Shift', onShiftDown, onShiftUp)

  React.useEffect(() => {
    const ref: React.MutableRefObject<HTMLDivElement> = forwardRef as React.MutableRefObject<HTMLDivElement>
    if (ref && ref.current) dispatch({ type: 'SET_ELEMENT', payload: ref.current })
  }, [forwardRef])

  React.useEffect(() => {
    if (ref && ref.current) dispatch({ type: 'SET_ELEMENT', payload: ref.current })
  }, [ref])

  React.useEffect(() => {
    if (!state.camera) return
    if (!height) return
    if (!width) return
    if (width === state.camera.viewport[2] && height === state.camera.viewport[3]) return
    dispatch({
      type: 'SET_CAMERA',
      payload: cameras.perspective.setProjection(null, state.camera, {
        height: height,
        width: width,
      }),
    })
  }, [state.camera, state.element, height, width])

  React.useEffect(() => {
    if (!state.element || !(state.element instanceof HTMLDivElement)) return
    if (!height) return
    if (!width) return
    if (state.element.clientHeight !== height) state.element.style.height = `${height}px`
    if (state.element.clientWidth !== width) state.element.style.width = `${width}px`
  }, [state.element, height, width])

  React.useEffect(() => {
    if (state.render) return
    if (!content) return
    if (!state.element) return
    if (!state.camera) return
    dispatch({
      type: 'SET_RENDER',
      payload: prepareRender({
        glOptions: { ...glOptions, container: state.element },
      }),
    })
  }, [content, glOptions, state])

  React.useEffect(() => {
    if (!state.panDelta) return
    if (!state.panDelta[0] && !state.panDelta[1]) return
    if (!state.camera) return
    if (!state.controls) return
    const updated = controls.orbit.pan(
      {
        controls: state.controls,
        camera: state.camera,
        speed: options?.viewerOptions?.panSpeed,
      },
      state.panDelta,
    )
    dispatch({
      type: 'SET_CONTROLS',
      payload: { ...state.controls, ...updated.controls },
    })
    dispatch({
      type: 'SET_CAMERA',
      payload: { ...state.camera, ...updated.camera },
    })
    dispatch({ type: 'SET_PAN_DELTA', payload: [0, 0] })
  }, [state.camera, state.controls, options?.viewerOptions?.panSpeed, state.panDelta])

  React.useEffect(() => {
    if (!state.rotateDelta) return
    if (!state.rotateDelta[0] && !state.rotateDelta[1]) return
    if (!state.camera) return
    if (!state.controls) return
    const updated = controls.orbit.rotate(
      {
        controls: state.controls,
        camera: state.camera,
        speed: options?.viewerOptions?.rotateSpeed,
      },
      state.rotateDelta,
    )
    dispatch({
      type: 'SET_CONTROLS',
      payload: { ...state.controls, ...updated.controls },
    })
    dispatch({ type: 'SET_ROTATE_DELTA', payload: [0, 0] })
  }, [state.camera, state.controls, options?.viewerOptions?.rotateSpeed, state.rotateDelta])

  React.useEffect(() => {
    if (!state.zoomDelta || !Number.isFinite(state.zoomDelta)) return
    if (!state.camera) return
    if (!state.controls) return
    const updated = controls.orbit.zoom(
      {
        controls: state.controls,
        camera: state.camera,
        speed: options?.viewerOptions?.zoomSpeed,
      },
      state.zoomDelta,
    )
    dispatch({
      type: 'SET_CONTROLS',
      payload: { ...state.controls, ...updated.controls },
    })
    dispatch({ type: 'SET_ZOOM_DELTA', payload: 0 })
  }, [state.camera, state.controls, options?.viewerOptions?.zoomSpeed, state.zoomDelta])

  const render = React.useCallback(() => {
    if (!state.render) return
    if (!content) return
    state.render({ camera: state.camera, ...content })
  }, [content, state])

  React.useEffect(() => {
    if (!animate) render()
  }, [animate, render])

  useAnimationFrame(!!animate, () => render(), [render])

  if (!forwardRef) return <div ref={ref} style={{ touchAction: 'none' }} />
  return <div ref={forwardRef} style={{ touchAction: 'none' }} />
})

Renderer.displayName = 'Renderer'

export type { RendererProps, RendererState, RendererAction }
export { Renderer, initialProps, initialState }
