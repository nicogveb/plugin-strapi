import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import MapInput from './components/MapInput';
import mutateEditViewHook from "./mutateEditviewLayout";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields({ type: "map-field", Component: MapInput })
    app.registerPlugin({
      id: pluginId,
      name,
    });
  },

  bootstrap(app) {
    app.registerHook(
      "Admin/CM/pages/EditView/mutate-edit-view-layout",
      mutateEditViewHook
    )
  },
  async registerTrads({ locales }) {

    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  
  },
};
