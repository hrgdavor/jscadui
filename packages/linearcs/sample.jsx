







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







