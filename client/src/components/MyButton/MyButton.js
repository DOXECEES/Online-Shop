import React, { useState } from "react";
import { memo } from "react";


export default memo(({ children, ...rest }) => (
    <button {...rest} >
        {children}
    </button>
));


