const PagesLayout = ({children, title = "TITULO DA PÁGINA"}) => {
    return ( 
        <div>
            <h1 className="text-5xl text-gray-600">{title}</h1>
            <div className="flex flex-1">
                {children}
            </div>
        </div>
     );
}
 
export default PagesLayout;