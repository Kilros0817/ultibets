import React, { useRef, useLayoutEffect } from 'react'

const Pie = (props) => {
  let am4core = null
  let am4charts = null
  let am4themesAnimated = null
  if (typeof window !== 'undefined') {
    am4core = require('@amcharts/amcharts4/core')
    am4charts = require('@amcharts/amcharts4/charts')
    am4themesAnimated = require('@amcharts/amcharts4/themes/animated')
    am4core.useTheme(am4themesAnimated.default)
  }
  const chart = useRef(null)

  useLayoutEffect(() => {
    let pie = am4core.create('chartdiv', am4charts.PieChart3D)

    const pieData = props.data.map((item) => {
      return {
        name: item.category,
        quantity: item.amount,
      }
    })
    
    // ...
    pie.data = pieData
    let pieSeries = pie.series.push(new am4charts.PieSeries3D())
    pie.radius = am4core.percent(80)

    //change text color
    pieSeries.labels.template.fill = am4core.color('#1F1F1F')

    //change labels font
    pieSeries.labels.template.fontFamily = 'Nunito'
    pieSeries.labels.template.fontSize = 20
    pieSeries.labels.template.fontWeight = 800
    pieSeries.slices.template.tooltipText = '{category}: {value} $UTBETS'

    pieSeries.slices.template.stroke = am4core.color("white");
    pieSeries.slices.template.strokeOpacity = 0.5
    pieSeries.colors.list = [
      new am4core.color('#739AF0'),
      new am4core.color('#A5D8DB'),
      new am4core.color('#FDE774'),
      new am4core.color('#ECA33F'),
      new am4core.color('#F9653C'),
      new am4core.color('#D07574'),
      new am4core.color('#BA7CE8'),
    ]

    pieSeries.dataFields.value = 'quantity'
    pieSeries.dataFields.category = 'name'
    pieSeries.hiddenState.properties.opacity = 1
    pieSeries.hiddenState.properties.endAngle = -90
    pieSeries.hiddenState.properties.startAngle = -90
    pie.hiddenState.properties.radius = am4core.percent(60)
    pie.innerRadius = am4core.percent(0)
    chart.current = pie

    return () => {
      pie.dispose()
    }
  }, [props.data])

  return (
    <div
      style={{ width: '100%', height: '600px', padding: '0 50px' }}
      id="chartdiv"
      className="pie"
    ></div>
  )
}

export default Pie;