export const errorPopup = err => {
  let errorsNode;
  errorsNode = document.getElementById("errors");
  if (errorsNode.hasChildNodes()) {
    errorsNode.removeChild(errorsNode.childNodes[0]);
  }
  let node = document.createElement("SPAN");
  let nodeErr = document.createTextNode(err);
  node.appendChild(nodeErr);
  errorsNode.appendChild(node);
  setTimeout(() => {
    let Node = document.getElementById("errors");
    if (errorsNode.hasChildNodes()) {
      Node.removeChild(Node.childNodes[0]);
    }
  }, 4000);
};
export const serverDown =
  "Sorry, we are having some issues at the moment. Please try again later.";
