act-local-playground:
	act --secret-file .github/.secrets --var-file .github/.env --workflows .github/workflows/local-playground.yml

act-quality-control:
	act --secret-file .github/.secrets --var-file .github/.env --workflows .github/workflows/quality-control.yml