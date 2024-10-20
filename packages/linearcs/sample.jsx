

// JSX should be a wrapper or structured so it works similar without JSX

// allow dependencies/relations can be inspected and visualised
// - intent is to keep references to stuff, and not resolve immediately
// - if values need immediate evaluation, original reference should be kept on the side in a structured way


let g1 = <Guide location={[10,10]} layer=""/>

return <>
  <Sketch>
    <Helpers>
      {g1}
      <Circle radius={5} location={g1}/>
      <Poly></Poly>
    </Helpers>
    <Poly>
      <Arc />

    </Poly>

  </Sketch>
</>







