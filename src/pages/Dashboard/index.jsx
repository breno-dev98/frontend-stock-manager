import DashboardCards from "../../components/DashboardCards";
import PagesLayout from "../../components/Layout/PagesLayout";

const DashboardPage = () => {
  return (
    <PagesLayout title="Dashboard">
      <div>
        <DashboardCards />
      </div>
    </PagesLayout>
  );
};

export default DashboardPage;
