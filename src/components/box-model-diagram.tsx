export function BoxModelDiagram() {
  return (
    <figure
      className="box-model-diagram"
      aria-label="Box model diagram showing margin, border, padding, and content"
    >
      <figcaption className="box-model-diagram__caption">
        Box model: margin, border, padding, content
      </figcaption>
      <div className="box-model-diagram__layer box-model-diagram__layer--margin">
        <span className="box-model-diagram__label">margin</span>
        <div className="box-model-diagram__layer box-model-diagram__layer--border">
          <span className="box-model-diagram__label">border</span>
          <div className="box-model-diagram__layer box-model-diagram__layer--padding">
            <span className="box-model-diagram__label">padding</span>
            <div className="box-model-diagram__layer box-model-diagram__layer--content">
              <span className="box-model-diagram__label box-model-diagram__label--content">
                content
              </span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
