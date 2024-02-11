import './Info.css';

export interface InfoProps {
  content: string;
}

export function Info({ content }: InfoProps) {
  return (
    <div className="info-container">
      <div className="info-question-mark">?</div>
      <div className="info-content">{content}</div>
    </div>
  );
}
