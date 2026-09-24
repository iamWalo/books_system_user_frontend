import React from 'react';
import Centure from '../Centure/Centure';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PageLayout = ({ children, breadcrumbItems }) => {
    return (
        <>
            <Centure />
            <Header />
            {breadcrumbItems && (
                <nav className="breadcrumbs">
                    {breadcrumbItems.map((item, index) => (
                        <React.Fragment key={item}>
                            {index > 0 && ' / '}
                            <span>{item}</span>
                        </React.Fragment>
                    ))}
                </nav>
            )}

            {children}
            <Footer />
        </>
    );
};

export default PageLayout;