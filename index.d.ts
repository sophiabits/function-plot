// TODO parametric / polar / implicit / points / vector fnType
// TODO type Options.plugins -- an array of functions which take the chart as a param?

declare module 'function-plot' {
  type Annotation = {
    x: number,
    text?: string,
  } | {
    y: number,
    text?: string,
  };

  type AxisOptions = {
    domain?: Domain,
    label?: string,
    type?: 'linear' | 'log',
  };

  type ChartEvent = 'before:mousemove' | 'mousemove' | 'mouseover' | 'all:mouseover' | 'mouseout' | 'all:mouseout' | 'zoom' | 'tip:update' | 'all:tip:update' | 'all:mousemove' | 'all:zoom' | 'programmatic-zoom' | 'before:draw' | 'after:draw';

  // TODO return type and shape of scope depends on fnType
  type Fn = string | ((scope: any) => number);

  type Datum = {
    fn: Fn,
    /** If true, this function will be rendered as an area graph. */
    closed?: boolean,
    color?: string,
    derivative?: Derivative,
    graphType?: 'polyline' | 'scatter' | 'interval',
    /** The number of equally spaced points in which the function will be evaluated over the current domain. */
    nSamples?: number,
    /** Evaluation of the function will be limited to this range instead of the domain. */
    range?: Domain,
    // TODO: builtIn sampler is incompatible with 'interval' graph type
    sampler?: 'builtIn' | 'interval',
    secants?: Secant[],
    /** If true, this data will not have a 'tip'. */
    skipTip?: boolean,
  };

  type Derivative = {
    /** Should be the first derivative of data.fn */
    fn: string,
    updateOnMouseMove: true,
  } | {
    /** Should be the first derivative of data.fn */
    fn: string,
    x0: number,
    updateOnMouseMove?: boolean,
  };

  type Domain = [number, number];

  type Secant = {
    x0: number,
    updateOnMouseMove: true,
  } | {
    x0: number,
    x1: number,
    updateOnMouseMove?: boolean,
  };

  type Tip = {
    xLine?: boolean,
    yLine?: boolean,
    renderer?: (x: number, y: number, index: number) => void,
  };

  type Options = {
    disableZoom?: boolean,
    grid?: boolean,
    height?: number,
    target: string | Element,
    title?: string,
    width?: number,
    xAxis?: AxisOptions,
    yAxis?: AxisOptions,

    annotations?: Annotation[],
    data: Datum[],
    tip?: Tip,
  };

  type Chart = {
    id: string,
    linkedGraphs: [Chart],
    markerId: string,
    meta: {
      height: number,
      margin: {
        bottom: number,
        left: number,
        right: number,
        top: number,
      },
      width: number,
      xDomain: Domain,
      yDomain: Domain,

      // TODO xAxis, yAxis, xScale, yScale, zoomBehavior
    },
    // TODO some properties are injected by functionPlot -- e.g. tip should not be optional here
    options: Options,

    // canvas, content, draggable, root, tip

    addLink: (...charts: Chart[]) => void,
    draw: () => void,
    getFontSize: () => number,
    off: (type: ChartEvent, listener: () => void) => void,
    on: (type: ChartEvent, listener: () => void) => void,
    once: (type: ChartEvent, listener: () => void) => void,
  };

  const functionPlot: (config: Options) => Chart;
  export default functionPlot;
}
