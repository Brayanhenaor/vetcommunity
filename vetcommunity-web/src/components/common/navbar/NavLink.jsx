import { NavLink as BaseNavLink } from "react-router-dom";
import * as React from "react";

export const NavLink = React.forwardRef(
    ({ activeClassName, activeStyle, ...props }, ref) => {
        return (
            <BaseNavLink
                ref={ref}
                {...props}
                className={({ isActive }) =>
                    [
                        props.className,
                        isActive ? activeClassName : null,
                    ]
                        .filter(Boolean)
                        .join(" ")
                }
                style={({ isActive }) => ({
                    ...props.style,
                    ...(isActive ? activeStyle : null),
                })}
            />
        );
    }
);