import Link from 'next/link'

const LeftSidebar = () => {
    return (
        <div className="fixed z-50 left-0 bottom-0 top-20 w-60 flex flex-col justify-around items-center">
            <div className="w-full h-full flex items-center justify-center tet-3xl text-slate-50 text-bold text-xl bg-base-100 shadow-lg">
                <Link className="bg-base-100 text-xl border-none btn w-full h-full" href="/">
                    <button>
                        Home
                    </button>
                </Link>
            </div>
            <div className="w-full h-full flex items-center justify-center tet-3xl text-slate-50 text-bold text-xl bg-base-100 shadow-lg">
                <Link className="bg-base-100 text-xl border-none btn w-full h-full" href="/create-chart">
                    <button>
                        Create Chart
                    </button>
                </Link>
            </div>
            <div className="w-full h-full flex items-center justify-center tet-3xl text-slate-50 text-bold text-xl bg-base-100 shadow-lg">
                <Link className="bg-base-100 text-xl border-none btn w-full h-full" href="/my-charts">
                    <button>
                        My Charts
                    </button>
                </Link>
            </div>
        </div> 
    )
}

export default LeftSidebar