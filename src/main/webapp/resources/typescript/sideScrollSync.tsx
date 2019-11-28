import * as React from 'react';
import {CSSProperties} from 'react';
import {ScrollSyncChildProps} from 'react-virtualized';
import AbstractScrollSync, {AbstractScrollSyncProps} from './abstractScrollSync';

export interface PlanningScrollSyncProps extends AbstractScrollSyncProps {
}

// noinspection JSUnusedGlobalSymbols
export default abstract class SideScrollSync extends AbstractScrollSync<PlanningScrollSyncProps> {

  protected constructor(props: PlanningScrollSyncProps, context?: any) {
    super(props, context);
  }

  protected getHeaderGrid(scrollSyncChildProps: ScrollSyncChildProps, width: number): React.ReactNode {
    return null;
  }

  protected getLeftHeaderGrid(scrollSyncChildProps: ScrollSyncChildProps, leftSideGridContainerStyle: CSSProperties, firstColumnWidth: number): React.ReactNode {
    return null;
  }

}
