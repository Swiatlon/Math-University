import React from 'react';
import { ResultTableContainer } from './ResultTable.style';

function ResultTable({ children }) {
  return <ResultTableContainer>{children}</ResultTableContainer>;
}

export default ResultTable;
