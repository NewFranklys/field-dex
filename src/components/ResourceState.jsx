import { useTranslation } from "react-i18next";

const ERROR_KEYS = {
  notFound: "states.notFound",
  unavailable: "states.unavailable",
  timeout: "states.timeout",
  offline: "states.offline",
  outOfScope: "states.outOfScope",
  alternateForm: "states.alternateForm",
};

export default function ResourceState({ loading, error, retry, children }) {
  const { t } = useTranslation("common");
  const errorKey = ERROR_KEYS[error?.code];
  const message = loading
    ? t("states.searching")
    : errorKey
      ? t(errorKey)
      : error?.message || children;

  return (
    <div className="resource-state" role={error ? "alert" : "status"}>
      <p>{message}</p>
      {!loading && retry && (
        <button type="button" onClick={retry}>
          {t("states.retry")}
        </button>
      )}
    </div>
  );
}
