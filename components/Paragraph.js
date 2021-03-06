function Paragraph({children}) {
    if (children && children[0] && children.length === 1 && children[0].props && children[0].props.src) {
        return children;
    }
    return <p>{children}</p>;
}

export default Paragraph