import React from "react";

function SimpleNotesWebComponent() {
  return (
    <iframe
      srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
  <template id="note-creator">

  </template>
  <script src="WebComponents.js"></script>
</body>
</html>
`}
    />
  );
}

export default SimpleNotesWebComponent;
