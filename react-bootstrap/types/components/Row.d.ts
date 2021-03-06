import * as React from 'react';

import { BsPrefixComponent } from './helpers';

export interface RowProps {
  noGutters?: boolean;
}

declare class Row<
  As extends React.ElementType = 'div'
> extends BsPrefixComponent<As, RowProps> {}

export default Row;
