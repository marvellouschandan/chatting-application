import Header from "./Header";

const HeaderLayout = (props) => {
    return (
        <div>
            <Header/>
            {props.children}
        </div>
    );
};

export default HeaderLayout;