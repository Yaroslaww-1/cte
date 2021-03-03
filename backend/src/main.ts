import { BackendApplication } from './api/backend-application';

(async (): Promise<void> => {
  await runApplication();
})();

const a = 'das';

async function runApplication(): Promise<void> {
  const backendApplication: BackendApplication = BackendApplication.new();
  await backendApplication.run();
}