import PropTypes from "prop-types";

const ContainerPage = ({ children }) => {
    return (
        <section className="max-w-[1440px] h-[calc(100dvh_-_64px)] bg-white flex flex-col justify-center items-center">
            {children}
        </section>
    );
};

ContainerPage.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ContainerPage;
