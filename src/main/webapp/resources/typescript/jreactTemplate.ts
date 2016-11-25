/// <reference path="./jreact.ts"/>
/// <reference path="../typings/tsd.d.ts"/>
module JReactComponents {

  export interface TemplateProps extends JReact.Props {
    name: string;
    label?: string;
  }

  export class Template extends JReact.Component<TemplateProps, any, any, any> {

    constructor(props: TemplateProps) {
      super(props);
    }

    private onClick(e: JQueryEventObject) {
      alert(this.props.label);
    }

    public componentDidMount() {
      this.getElement().find('[name=' + this.props.name + ']').click(this.onClick.bind(this));
    }
  }
}
