import { FC, useState } from "react";

export const ApiKeySetup: FC = () => {
  const [modelId, setModelId] = useState(localStorage.getItem("modelId") || "");
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");

  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    localStorage.setItem("modelId", modelId);
    localStorage.setItem("apiKey", apiKey);
    setShowModal(false);
  };

  return (
    <>
      <button className="api-key-setup" onClick={() => setShowModal(true)}>
        Configurar API
      </button>

      {showModal && (
        <div className="api-key-modal">
          <div className="api-key-content">
            <div className="api-key-title">Configurar API</div>

            <input
              placeholder="ID del modelo"
              style={{ width: 124 }}
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
            />

            <input
              placeholder="Llave de API"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />

            <div className="api-key-buttons">
              <button className="btn-ok" onClick={() => onClick()}>
                Guardar
              </button>

              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
