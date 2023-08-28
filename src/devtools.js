
chrome.devtools.panels.create(
  "Notes",
  null,
  "/src/panel.html",
  function(panel) {
    let panelWindow;
    
    panel.onShown.addListener(function(window) {
      panelWindow = window;
      loadNotes(window);
    });
    
    chrome.devtools.network.onNavigated.addListener(function(url) {
      if (panelWindow) {
        loadNotes(panelWindow);
      }
    });
  }
);

function loadNotes(panelWindow) {
  chrome.devtools.inspectedWindow.eval(
    'window.location.href',
    function(result, isException) {
      
      if (isException) {
        console.error(isException);
        return;
      }
      
      const url = new URL(result)
        .toString()
        .split("?")[0]
        .split("#")[0];
        
      panelWindow.load(url);
      
    }
  );
}
