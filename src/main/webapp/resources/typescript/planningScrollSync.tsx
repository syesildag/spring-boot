import * as React from 'react';
import AbstractScrollSync, {AbstractScrollSyncProps} from './abstractScrollSync';

export interface PlanningScrollSyncProps extends AbstractScrollSyncProps {
}

// noinspection JSUnusedGlobalSymbols
export default abstract class PlanningScrollSync extends AbstractScrollSync<PlanningScrollSyncProps> {

  protected constructor(props: PlanningScrollSyncProps, context?: any) {
    super(props, context);
  }
}