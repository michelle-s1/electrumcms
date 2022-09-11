import AuthLogo from 'assets/my-logo.png';
import MenuLogo from 'assets/logo.png';
import favicon from 'assets/favicon.ico';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
   // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Add a new locale, other than 'en'
    locales: ['fr', 'de'],
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
      colors: {
        primary100: '#EAEBEA',
        primary200: '#B5BAB7',
        primary500: '#777E79',
        primary600: '#5B5B5D',
        primary700: '#3a3d3b',
        danger700: '#CB423D',
        secondary100:'#eafbd0',
        secondary200:'#dff9b9',
        secondary500:'#caf5ab',
        secondary600:'#b4f05c',
        secondary700:'#94ea16',
        buttonPrimary500: '#887750',
        buttonPrimary600: '#887750'
        },
    },
    // Extend the translations
    translations: {
      fr: {
        'Auth.form.email.label': 'test',
        Users: 'Utilisateurs',
        City: 'CITY (FRENCH)',
        // Customize the label of the Content Manager table.
        Id: 'ID french',
      },
    },
   // Disable video tutorials
    tutorials: false,
   // Disable notifications about new Strapi releases
    notifications: { release: false },
  },

  bootstrap(app) {app.injectContentManagerComponent("listView", "actions", {
    name: "DraftFilterButton",
    Component: DraftFilterButton,
  });
  app.injectContentManagerComponent("editView", "right-links", {
    name: "PreviewButton",
    Component: PreviewButton,
  });
  app.injectContentManagerComponent("editView", "right-links", {
    name: "InternalComment",
    Component: InternalComment,
  });
  app.injectContentManagerComponent("editView", "right-links", {
    name: "TweetButton",
    Component: TweetButton,
  });},
};