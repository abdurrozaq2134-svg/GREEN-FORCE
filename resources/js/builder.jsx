import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import EventBuilder from './components/Builder/EventBuilder';
import store from './store';

const appEl = document.getElementById('event-builder-app');
if (appEl) {
  const initialElements = [];
  try {
    const raw = appEl.getAttribute('data-elements');
    if (raw) {
      initialElements.push(...JSON.parse(raw));
    }
  } catch (e) {
    /* malformed JSON — start with empty canvas */
  }
  let pages = [];
  try {
    const rawPages = appEl.getAttribute('data-user-pages');
    if (rawPages) {
      pages = JSON.parse(rawPages);
    }
  } catch (e) {
    /* malformed JSON — no internal link targets */
  }
  let initialPages = [];
  try {
    const rawInitialPages = appEl.getAttribute('data-pages');
    if (rawInitialPages) {
      initialPages = JSON.parse(rawInitialPages);
    }
  } catch (e) {
    /* malformed JSON — builder derives default single page */
  }
  let initialPublicUrls = null;
  try {
    const rawUrls = appEl.getAttribute('data-public-urls');
    if (rawUrls && rawUrls !== 'null') {
      initialPublicUrls = JSON.parse(rawUrls);
    }
  } catch (e) {
    /* malformed JSON — tombol Publish tetap berfungsi, cuma tanpa link awal */
  }
  const root = createRoot(appEl);
  root.render(
    <Provider store={store}>
      <EventBuilder
        pageId={appEl.getAttribute('data-page-id') || ''}
        initialTitle={appEl.getAttribute('data-title') || 'Untitled Event'}
        initialElements={initialElements}
        initialPages={initialPages}
        saveUrl={appEl.getAttribute('data-save-url') || '/builder/save'}
        pages={pages}
        initialSlug={appEl.getAttribute('data-slug') || null}
        initialIsPublished={appEl.getAttribute('data-is-published') === '1'}
        initialPublicUrls={initialPublicUrls}
      />
    </Provider>
  );
}
