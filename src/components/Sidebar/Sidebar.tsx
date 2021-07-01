interface ComponentProps {
  visible: boolean;
  onHide: () => void;
}
export const Sidebar: React.FC<ComponentProps> = ({
  visible,
  onHide,
  children,
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
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};
