(() => {
  'use strict';

  function init() {
    [].forEach.call(document.querySelectorAll('i.icon-heart'), (element) => {
      element.addEventListener('click', () => {
        const xhr = new XMLHttpRequest();
        const path = `/question/${element.getAttributeNode('question').value}/like`;

        xhr.open('post', path);
        xhr.send();
      });
    });
  }

  window.addEventListener('load', () => {
    if (document.readyState === 'complete') {
      init();
    }
  });
})();
