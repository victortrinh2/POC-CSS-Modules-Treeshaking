/* eslint-disable max-len */

import { forwardRef } from "react";

// The SVG is currently inlined manually in a component because we are having issues adding SVG as component within a library.
// View: https://github.com/egoist/tsup/discussions/811#discussioncomment-6308531.
export default forwardRef<SVGSVGElement>((props, ref) => {
    return (
        <svg width="150" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 40" {...props} ref={ref}>
            <path d="M34 5c-4.5 0-7.6 2.9-7.6 7.4s2.9 7.8 7.6 7.8c4.5 0 7.6-3 7.6-7.8 0-4.3-3-7.5-7.6-7.5Zm0 11.7c-2.1 0-3.4-1.7-3.4-4.3 0-2.4 1.3-4 3.4-4 2.1 0 3.4 1.6 3.4 4 0 2.6-1.3 4.3-3.4 4.3ZM68.4 4.9h-5.1l-5.5 5.8V.7h-4.2v19.1h4.2v-4.3l2-2 4.1 6.3h4.8l-6-9.2 5.7-5.7Zm1.5 14.9h4.2V.8h-4.2v19Zm32.5-12.3A5.4 5.4 0 0 0 97.5 5c-3.7 0-6.4 3.1-6.4 7.6s2.7 7.7 6.5 7.7c1.9 0 3.5-.8 4.4-2.1v1.7h4.1V5.3h-3.3l-.4 2.2Zm-3.8 9.2c-2 0-3.3-1.7-3.3-4.3 0-2.5 1.3-4.2 3.3-4.2 2 0 3.4 1.7 3.4 4.2s-1.4 4.3-3.4 4.3Zm18-11.8c-2.3 0-4 1-5 2.6l-.3-2.2H108v19h4.2v-6.2c.9 1.3 2.5 2 4.4 2 3.8 0 6.5-3 6.5-7.6 0-4.5-2.7-7.6-6.5-7.6Zm-1.2 11.8c-2 0-3.3-1.7-3.3-4.3 0-2.4 1.3-4 3.3-4 2 0 3.4 1.6 3.4 4.1 0 2.5-1.4 4.2-3.4 4.2ZM82.8 5c-4.3 0-7.4 3.2-7.4 7.7s3.2 7.6 7.7 7.6c3.1 0 5.5-1.5 6.5-4.2l-3.8-.9c-.3 1-1.5 1.7-2.8 1.7-2 0-3.2-1.4-3.5-3.3h10.3v-2.2c-.3-4-3.2-6.4-7-6.4Zm-3.1 6c.4-1.7 1.6-2.8 3.1-2.8 1.6 0 2.7 1 3 2.8h-6.1ZM46.6 8.1l-.4-2.9h-3.4v14.6h4.1v-7c0-2.5 1.8-4 4.7-4h.6V5h-.4c-2.6 0-4.2 1-5.2 3.2Zm-24-2.8-3.4 10.3L16 5.3h-4L8.8 18 5.4 5.3H1l5.2 19h4.6L14 11.4l3.1 8.8H22l5.1-15h-4.3Z" fill="#3C3C3C" />
        </svg>
    );
});
