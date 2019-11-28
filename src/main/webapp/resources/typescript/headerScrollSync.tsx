import * as React from 'react';
import {ScrollSyncChildProps} from 'react-virtualized';
import AbstractScrollSync, {AbstractScrollSyncProps} from './abstractScrollSync';

export interface PlanningScrollSyncProps extends AbstractScrollSyncProps {
}

export default abstract class HeaderScrollSync extends AbstractScrollSync<PlanningScrollSyncProps> {

  protected constructor(props: PlanningScrollSyncProps, context?: any) {
    super(props, context);
  }

  protected getLeftSideGrid(scrollSyncChildProps: ScrollSyncChildProps): React.ReactNode {
    return null;
  }

}