import React, { FC, ReactNode } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './navMenu';

interface LayoutProps {
    children: ReactNode[];
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <NavMenu />
            <Container>
                {children}
            </Container>
        </div>
    );
};

export default Layout;
