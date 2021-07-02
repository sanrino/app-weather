interface ComponentProps {
  visible: boolean;
  onHide: () => void;
  title: string;
}
export const Sidebar: React.FC<ComponentProps> = ({
  visible,
  onHide,
  children,
  title,
}) => {
  return (
    <>
      {visible && (
        <>
          <div className={visible ? "overlay overlay-show" : "overlay"}></div>
          <div className="modal-wrapper">
            <div className="modal">
              <button className="modal-close" onClick={onHide}>
                <i className="material-icons">close</i>
              </button>
              <div className="modal-title">
                <h2>{title}</h2>
              </div>

              <div className="modal-contant">{children}</div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
