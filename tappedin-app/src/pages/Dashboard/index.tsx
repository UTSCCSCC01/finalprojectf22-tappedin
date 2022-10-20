import { 
    customBackground,
    customBanner,
    editContainer,
    customNavbar
} from "./Dashboard.module.scss";

export default function DashboardPage()
{
    return (
        <div className={ `${customBackground}` }>
            <div className={ `${customBanner} mb-10` }>
                
            </div>
            <div className="container mx-auto px-4 lg:px-0">
                <div className="grid grid-cols-1 lg:gap-10 lg:grid-cols-4">
                    <div className={ `${customNavbar} justify-center mb-10` }>
                        <h1 className="font-bold text-center">
                                    Tapped
                            <span style={{ color: "#639FAB" }}>
                                        In.
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-col col-span-3">
                        <h1 className="mb-3 font-bold">
                            Edit
                        </h1>
                        <div className={ `${editContainer}` }>
                            {/* TODO: Insert Content Here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}