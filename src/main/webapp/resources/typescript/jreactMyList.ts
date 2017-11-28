/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
namespace JReactComponents {

  interface MyListProps extends ListProps {
  }

  enum MyListActionType {
  }

  interface MyListActionPayload {
  }

  export class MyList extends JReact.Component<MyListProps, ListState, MyListActionType, MyListActionPayload> {

    constructor(props: MyListProps) {
      super(props);
    }

    protected itemRenderer(index: number, key: JReact.Key, first: boolean, offset: number, scroll: number) {
      let style: React.CSSProperties = {};

      if (first) {
        style.position = 'relative';
        style.top = (scroll - offset) + 'px';
        style.backgroundColor = 'yellow';
      }

      return JReact.createElement(
        'div',
        { key: index, style },
        first ? 'header' : 'x' + index + 'x' + '-' + first + '- offset ' + offset + '- scroll ' + scroll
        );
    }

    protected itemsRenderer(items: JReact.ComponentArray, ref: string) {
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
        JReact.createElement('div', { key: 0 }, 'serkan1'),
        JReact.createElement('div', { key: 1 }, 'serkan2'),
        JReact.createElement('div', { key: 2 }, 'serkan3'),
        JReact.createElement<ListProps, List>(
          List,
          {
            key: 3,
            axis: Axis.y,
            listType: ListType.uniform,
            useStaticSize: false,
            useTranslate3d: true,
            pageSize: 20,
            threshold: 80,
            itemRenderer: this.itemRenderer,
            itemsRenderer: this.itemsRenderer,
            length: 100,
            fixedHeader: true
          }));
    }
  }
}
