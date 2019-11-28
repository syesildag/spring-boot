import * as React from 'react';
import { AutoSizer, Grid, GridCellProps, ScrollSync, ScrollSyncChildProps } from 'react-virtualized';
import { Utils } from './utils';

import scrollbarSize = Utils.scrollbarSize;
import CSSProperties = React.CSSProperties;

export type ClassKey =
  'GridRow'
  | 'LeftSideGridContainer'
  | 'HeaderGrid'
  | 'GridColumn'
  | 'BodyGrid'
  | 'LeftSideGrid'
  | 'leftHeaderCell'
  | 'evenRow'
  | 'oddRow';

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface AbstractScrollSyncProps {
  showScrolling?: boolean,
  firstColumnWidthMultiplier?: number,
  columnWidth?: number,
  columnCount?: number,
  height?: number,
  overscanColumnCount?: number,
  overscanRowCount?: number,
  firstRowHeight?: number,
  rowHeight?: number,
  rowCount?: number,
  gridRowClassName?: string,
  classes?: ClassNameMap<ClassKey>;
}

/*
 *@author SYESILDAG
 */
export default abstract class AbstractScrollSync<P extends AbstractScrollSyncProps> extends React.PureComponent<P> {

  private static defaultProps: Pick<AbstractScrollSyncProps,
    "showScrolling"
    | "firstColumnWidthMultiplier"
    | "columnWidth"
    | "columnCount"
    | "height"
    | "overscanColumnCount"
    | "overscanRowCount"
    | "firstRowHeight"
    | "rowHeight"
    | "rowCount"
    | "classes"> = {
      showScrolling: true,
      firstColumnWidthMultiplier: 2,
      columnWidth: 75,
      columnCount: 50,
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      firstRowHeight: 80,
      rowHeight: 40,
      rowCount: 100,
      classes: {
        BodyGrid: "BodyGrid",
        GridColumn: "GridColumn",
        GridRow: "GridRow",
        HeaderGrid: "HeaderGrid",
        LeftSideGridContainer: "LeftSideGridContainer",
        LeftSideGrid: "LeftSideGrid",
        leftHeaderCell: "leftHeaderCell",
        evenRow: "evenRow",
        oddRow: "oddRow"
      }
    };

  protected constructor( props: P, context?: any ) {
    super( props, context );

    if ( props.firstColumnWidthMultiplier < 1 )
      throw new TypeError( "firstColumnWidthMultiplier should be > 0" );
  }

  render() {

    return (
      <div>

        <div>
          High order component that simplifies the process of synchronizing
          scrolling between two or more virtualized components.
        </div>

        <ScrollSync>
          {scrollSyncChildProps => {

            let leftSideGrid = this.getLeftSideGrid( scrollSyncChildProps );

            return (
              <div className={this.props.classes.GridRow} style={this._getGridRowStyle( scrollSyncChildProps )}>
                {leftSideGrid}
                <div className={this.props.classes.GridColumn} style={this._getGridColumnStyle( scrollSyncChildProps )}>
                  <AutoSizer disableHeight>
                    {( { width } ) => (
                      <div>
                        {this.getHeaderGrid( scrollSyncChildProps, width, leftSideGrid )}
                        {this.getBodyGrid( scrollSyncChildProps, width, leftSideGrid )}
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
      </div>
    );
  }

  protected getHeaderGrid( scrollSyncChildProps: ScrollSyncChildProps, width: number, leftSideGrid: React.ReactNode ): React.ReactNode {

    let {
      columnCount,
      columnWidth,
      overscanColumnCount,
      firstRowHeight,
      classes
    } = this.props;

    columnCount += this.compensateFirstColumn( leftSideGrid );

    return (
      <div
        style={this._getHeaderStyle( scrollSyncChildProps, firstRowHeight, width )}>
        <Grid
          className={classes.HeaderGrid}
          columnWidth={columnWidth}
          columnCount={columnCount}
          height={firstRowHeight}
          overscanColumnCount={overscanColumnCount}
          cellRenderer={( gridCellProps: GridCellProps ) => this._renderHeaderCell( gridCellProps, leftSideGrid )}
          rowHeight={firstRowHeight}
          rowCount={1}
          scrollLeft={scrollSyncChildProps.scrollLeft}
          width={width - scrollbarSize()}
        />
      </div>
    );
  }

  protected getBodyGrid( scrollSyncChildProps: ScrollSyncChildProps, width: number, leftSideGrid: React.ReactNode ): React.ReactNode {

    let {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      classes
    } = this.props;

    columnCount += this.compensateFirstColumn( leftSideGrid );

    return (
      <div
        style={this._getBodyStyle( scrollSyncChildProps, height, width )}>
        <Grid
          className={classes.BodyGrid}
          columnWidth={columnWidth}
          columnCount={columnCount}
          height={height}
          onScroll={scrollSyncChildProps.onScroll}
          overscanColumnCount={overscanColumnCount}
          overscanRowCount={overscanRowCount}
          cellRenderer={( gridCellProps: GridCellProps ) => this._renderBodyCell( gridCellProps, leftSideGrid )}
          rowHeight={rowHeight}
          rowCount={rowCount}
          width={width}
        />
      </div>
    );
  }

  protected getLeftSideGrid( scrollSyncChildProps: ScrollSyncChildProps ): React.ReactNode {

    let {
      height,
      overscanColumnCount,
      overscanRowCount,
      firstRowHeight,
      rowHeight,
      rowCount,
      classes
    } = this.props;

    let leftSideGridContainerStyle = this._getLeftSideGridContainerStyle( scrollSyncChildProps );

    let firstColumnWidth = this.getFirstColumnWidth();

    let leftHeaderGrid = this.getLeftHeaderGrid( scrollSyncChildProps, leftSideGridContainerStyle, firstColumnWidth );

    return (
      <>
        {leftHeaderGrid}
        <div
          className={classes.LeftSideGridContainer}
          style={{ ...leftSideGridContainerStyle, ...this._getLeftSideStyle( scrollSyncChildProps, firstRowHeight, leftHeaderGrid ) }}>
          <Grid
            overscanColumnCount={overscanColumnCount}
            overscanRowCount={overscanRowCount}
            cellRenderer={this.renderLeftSideCell}
            columnWidth={firstColumnWidth}
            columnCount={1}
            className={classes.LeftSideGrid}
            height={height - scrollbarSize()}
            rowHeight={rowHeight}
            rowCount={rowCount}
            scrollTop={scrollSyncChildProps.scrollTop}
            width={firstColumnWidth}
          />
        </div>
      </>
    );
  }

  protected getLeftHeaderGrid( scrollSyncChildProps: ScrollSyncChildProps, leftSideGridContainerStyle: CSSProperties, firstColumnWidth: number ): React.ReactNode {

    let { firstRowHeight, classes } = this.props;

    return (
      <div
        className={classes.LeftSideGridContainer}
        style={{ ...leftSideGridContainerStyle, ...this._getLeftHeaderStyle( scrollSyncChildProps ) }}>
        <Grid
          cellRenderer={this.renderLeftHeaderCell}
          className={classes.HeaderGrid}
          width={firstColumnWidth}
          height={firstRowHeight}
          rowHeight={firstRowHeight}
          columnWidth={firstColumnWidth}
          rowCount={1}
          columnCount={1}
        />
      </div>
    );
  }

  // noinspection FunctionWithMultipleReturnPointsJS
  private compensateFirstColumn( leftSideGrid: React.ReactNode ) {

    if ( !leftSideGrid )
      return 0;

    return this.props.firstColumnWidthMultiplier - 1;
  }

  private getFirstColumnWidth() {
    let { firstColumnWidthMultiplier, columnWidth } = this.props;
    return firstColumnWidthMultiplier * columnWidth;
  }

  // noinspection FunctionWithInconsistentReturnsJS, FunctionWithMultipleReturnPointsJS
  private _renderBodyCell = ( gridCellProps: GridCellProps, leftSideGrid: React.ReactNode ) => {

    if ( leftSideGrid && gridCellProps.columnIndex < 1 )
      return;

    gridCellProps.columnIndex -= this.compensateFirstColumn( leftSideGrid );

    return this.renderBodyCell( gridCellProps );
  };

  protected renderBodyCell = ( gridCellProps: GridCellProps ) => {
    return this.renderLeftSideCell( gridCellProps );
  };

  // noinspection FunctionWithInconsistentReturnsJS, FunctionWithMultipleReturnPointsJS
  private _renderHeaderCell = ( gridCellProps: GridCellProps, leftSideGrid: React.ReactNode ) => {

    if ( leftSideGrid && gridCellProps.columnIndex < 1 )
      return;

    gridCellProps.columnIndex -= this.compensateFirstColumn( leftSideGrid );

    console.log( [gridCellProps.columnIndex, gridCellProps] );

    return this.renderHeaderCell( gridCellProps );
  };

  protected renderHeaderCell = ( gridCellProps: GridCellProps ) => {
    return this.renderLeftHeaderCell( gridCellProps );
  };

  protected renderLeftHeaderCell = ( gridCellProps: GridCellProps ) => {

    let { showScrolling, classes } = this.props;
    let { key, style, columnIndex, isScrolling } = gridCellProps;

    return (
      <div className={classes.leftHeaderCell} key={key} style={style}>
        {showScrolling && isScrolling ? "..." : `C${columnIndex}`}
      </div>
    );
  };

  protected renderLeftSideCell = ( gridCellProps: GridCellProps ) => {

    let { showScrolling, classes } = this.props;
    let { columnIndex, key, rowIndex, style, isScrolling } = gridCellProps;

    // noinspection NestedConditionalExpressionJS, NegatedConditionalExpressionJS
    const rowClass =
      rowIndex % 2 === 0
        ? columnIndex % 2 === 0 ? classes.evenRow : classes.oddRow
        : columnIndex % 2 !== 0 ? classes.evenRow : classes.oddRow;

    return (
      <div className={rowClass} key={key} style={style}>
        {showScrolling && isScrolling ? "..." : `R${rowIndex}, C${columnIndex}`}
      </div>
    );
  };

  private _getLeftHeaderStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {
      ...this.getLeftHeaderStyle( props ),
      position: 'absolute',
      left: 0,
      top: 0
    };
  };

  // noinspection JSUnusedLocalSymbols
  protected getLeftHeaderStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {};
  };

  private _getLeftSideStyle = ( props: ScrollSyncChildProps, height: number, leftHeaderGrid: React.ReactNode ): CSSProperties => {
    return {
      ...this.getLeftSideStyle( props, height ),
      position: 'absolute',
      left: 0,
      top: leftHeaderGrid ? height : 0,
    };
  };

  // noinspection JSUnusedLocalSymbols
  protected getLeftSideStyle = ( props: ScrollSyncChildProps, height: number ): CSSProperties => {
    return {};
  };

  private _getHeaderStyle = ( props: ScrollSyncChildProps, height: number, width: number ): CSSProperties => {
    return {
      ...this.getHeaderStyle( props, height, width ),
      height: height,
      width: width - scrollbarSize(),
    };
  };

  // noinspection JSUnusedLocalSymbols
  protected getHeaderStyle = ( props: ScrollSyncChildProps, height: number, width: number ): CSSProperties => {
    return {};
  };

  private _getBodyStyle = ( props: ScrollSyncChildProps, height: number, width: number ): CSSProperties => {
    return {
      ...this.getBodyStyle( props, height, width ),
      height,
      width,
    };
  };

  // noinspection JSUnusedLocalSymbols
  protected getBodyStyle = ( props: ScrollSyncChildProps, height: number, width: number ): CSSProperties => {
    return {};
  };

  private _getGridRowStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {
      ...this.getGridRowStyle( props ),
      position: 'relative',
      display: 'flex',
      flexDirection: 'row'
    };
  };

  // noinspection JSUnusedLocalSymbols
  protected getGridRowStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {};
  };

  private _getLeftSideGridContainerStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {
      ...this.getLeftSideGridContainerStyle( props ),
      backgroundColor: 'silver',
      zIndex: 10,
    };
  };

  // noinspection JSUnusedLocalSymbols
  protected getLeftSideGridContainerStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {};
  };

  private _getGridColumnStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {
      ...this.getGridColumnStyle( props ),
      display: 'flex',
      flexDirection: 'column',
      flex: '1 1 auto',
    };
  };

  // noinspection JSUnusedLocalSymbols
  protected getGridColumnStyle = ( props: ScrollSyncChildProps ): CSSProperties => {
    return {};
  };

}
