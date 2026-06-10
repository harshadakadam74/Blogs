import { Moon, Sun } from "lucide-react";

function AppearanceSettings({
  darkMode,
  setDarkMode,
}) {
  return (
    <div
      id="appearance"
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <div className="flex items-center gap-3 mb-6">
        {darkMode ? (
          <Moon className="text-indigo-600" />
        ) : (
          <Sun className="text-amber-500" />
        )}

        <h2 className="text-2xl font-bold">
          Appearance
        </h2>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">
            Dark Mode
          </h3>

          <p className="text-sm text-gray-500">
            Switch between light and dark theme.
          </p>
        </div>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
          className={`
            relative
            w-14 h-8
            rounded-full
            transition-all
            ${
              darkMode
                ? "bg-emerald-600"
                : "bg-gray-300"
            }
          `}
        >
          <span
            className={`
              absolute
              top-1
              left-1
              w-6 h-6
              bg-white
              rounded-full
              transition-all
              ${
                darkMode
                  ? "translate-x-6"
                  : ""
              }
            `}
          />
        </button>
      </div>
    </div>
  );
}
export default AppearanceSettings;