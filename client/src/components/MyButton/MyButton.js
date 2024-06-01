import React, { memo } from "react";
import { Link } from "react-router-dom";


export default memo(({ children, to, ...rest }) => (
    <Link className="link-button" to={to} style={{ maxWidth: "100%" }}>
        <button {...rest} >
            {children}
        </button>
    </Link>
));


