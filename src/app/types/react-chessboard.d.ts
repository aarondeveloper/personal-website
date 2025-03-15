declare module 'react-chessboard' {
  interface ChessboardProps {
    position?: string;
    boardWidth?: number;
    customDarkSquareStyle?: React.CSSProperties;
    customLightSquareStyle?: React.CSSProperties;
    boardOrientation?: 'white' | 'black';
    showBoardNotation?: boolean;
    arePiecesDraggable?: boolean;
  }

  export function Chessboard(props: ChessboardProps): JSX.Element;
} 