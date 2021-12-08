const { Plugin } = require('@uppy/core');
const { Provider } = require('@uppy/companion-client');
const { ProviderViews } = require('@uppy/provider-views');
const { h } = require('preact');

module.exports = class Egnyte extends Plugin {
  static VERSION = require('../package.json').version

  constructor (uppy, opts) {
    super(uppy, opts)
    this.id = this.opts.id || 'Egnyte'
    Provider.initPlugin(this, opts)
    this.title = this.opts.title || 'Egnyte'
    this.icon = () => (
      <svg width="67" height="71" viewBox="0 0 67 71" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M35.6632 20.5168H30.6832C30.3482 20.5168 30.0742 20.2402 30.0742 19.9032V0.613735C30.0742 0.276979 30.3482 0 30.6832 0H35.6632C35.9982 0 36.2732 0.276714 36.2732 0.613735V19.9032C36.2732 20.2399 35.9982 20.5168 35.6632 20.5168Z" fill="#32BDB5" />
        <path fillRule="evenodd" clipRule="evenodd" d="M46.1363 47.4846L48.6213 43.1404C48.7883 42.8517 49.1583 42.7435 49.4573 42.9118L66.0353 52.5505C66.3213 52.7191 66.4293 53.092 66.2623 53.3929L63.7773 57.7367C63.6103 58.0255 63.2403 58.1339 62.9413 57.9655L46.3633 48.3268C46.0653 48.1461 45.9693 47.7732 46.1363 47.4845V47.4846Z" fill="#32BDB5" />
        <path fillRule="evenodd" clipRule="evenodd" d="M17.7233 43.1392L20.2073 47.4833C20.3742 47.772 20.2793 48.1572 19.9803 48.3257L3.40226 57.9643C3.11525 58.1328 2.73326 58.0365 2.56626 57.7357L0.0822653 53.3917C-0.0857347 53.1029 0.01026 52.7177 0.309258 52.5493L16.8873 42.9106C17.1733 42.7421 17.5563 42.8384 17.7233 43.1392V43.1392Z" fill="#32BDB5" />
        <path fillRule="evenodd" clipRule="evenodd" d="M64.5558 24.7788L59.4078 15.802C59.0978 15.2725 58.4288 15.0801 57.8908 15.3929L33.1668 29.7726L8.44279 15.3929C7.91779 15.0799 7.2368 15.2726 6.9268 15.802L1.77879 24.7788C1.46781 25.3084 1.65879 25.9942 2.18479 26.307L26.9088 40.6868V69.4464C26.9088 70.0601 27.3978 70.5655 28.0188 70.5655H38.3028C38.9118 70.5655 39.4138 70.0721 39.4138 69.4464V40.6868L64.1378 26.307C64.6748 25.9941 64.8538 25.3084 64.5558 24.7788V24.7788Z" fill="#4B4F54" />
      </svg>
    );


    this.provider = new Provider(uppy, {
      companionUrl: this.opts.companionUrl,
      companionHeaders: this.opts.companionHeaders || this.opts.serverHeaders,
      companionKeysParams: this.opts.companionKeysParams,
      companionCookiesRule: this.opts.companionCookiesRule,
      provider: 'egnyte',
      pluginId: this.id,
    })

    this.onFirstRender = this.onFirstRender.bind(this)
    this.render = this.render.bind(this)
  }

  install () {
    this.view = new ProviderViews(this, {
      provider: this.provider,
    })

    const target = this.opts.target
    if (target) {
      this.mount(target, this)
    }
  }

  uninstall () {
    this.view.tearDown()
    this.unmount()
  }

  onFirstRender () {
    return Promise.all([
      this.provider.fetchPreAuthToken(),
      this.view.getFolder(),
    ])
  }

  render (state) {
    return this.view.render(state)
  }
}
