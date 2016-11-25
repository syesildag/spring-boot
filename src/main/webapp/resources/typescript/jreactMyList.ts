/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
module JReactComponents {

  interface MyListProps extends ListProps {
  }

  enum MyListActionType {
    UPDATE_SIZE
  }

  interface MyListActionPayload {
    size?: number
  }

  export class MyList extends JReact.Component<MyListProps, ListState, MyListActionType, MyListActionPayload> {

    constructor(props: MyListProps) {
      super(props);
    }

    itemRenderer(index: number, key: JReact.Key) {
      return JReact.createElement(
        'div',
        { key },
        'x' + index + 'x'
        );
    }

    itemsRenderer(items: JReact.ComponentArray, ref: string) {
      return JReact.createElement(
        'div',
        { ref },
        ...items
        );
    }

    public render() {

      return JReact.createElement(
        'div',
        { style: { overflow: 'auto', maxHeight: 100 } },
        JReact.createElement(
          List,
          {
            axis: Axis.y,
            listType: ListType.uniform,
            useStaticSize: false,
            useTranslate3d: false,
            pageSize: 10,
            threshold: 20,
            itemRenderer: this.itemRenderer.bind(this),
            itemsRenderer: this.itemsRenderer.bind(this),
            length: 100
          }
          ));
    }
  }
}
