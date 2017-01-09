/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
module JReactComponents {

  interface MyGridListProps extends ListProps {
  }

  enum MyGridListActionType {
  }

  interface MyGridListActionPayload {
    size?: number
  }

  export class MyGridList extends JReact.Component<MyGridListProps, ListState, MyGridListActionType, MyGridListActionPayload> {

    constructor(props: MyGridListProps) {
      super(props);

      this.itemRenderer = this.itemRenderer.bind(this);
      this.itemsRenderer = this.itemsRenderer.bind(this);
    }

    protected itemsRenderer(items: JReact.ComponentArray, ref: string) {
      return JReact.createElement(
        'div',
        { ref },
        ...items
        );
    }

    protected itemRenderer(row: number, key: JReact.Key) {
      const XLENGTH = 100, style = { display: "inline-block", width: "100px" };
      return JReact.createElement<ListProps, List>(
        //COLUMN
        JReactComponents.List,
        {
          axis: Axis.x,
          key: key,
          pageSize: 10,
          threshold: 20,          listType: ListType.uniform,          itemsRenderer: this.itemsRenderer,          itemRenderer: (col: number, key: JReact.Key) => JReact.createElement(
            'div',
            { key, style },
            'x' + (col + (XLENGTH * row)) + 'x'
            ),
          length: XLENGTH
        });
    }

    public render() {
      return JReact.createElement(
        'div',
        { style: { overflow: 'auto', maxHeight: 100 } },
        //GRID
        JReact.createElement<ListProps, List>(
          List,
          {
            axis: Axis.y,
            key: 1,
            pageSize: 10,
            threshold: 20,
            listType: ListType.uniform,
            useStaticSize: false,
            useTranslate3d: true,
            itemsRenderer: this.itemsRenderer,
            itemRenderer: this.itemRenderer,
            length: 1000
          }));
    }
  }
}
