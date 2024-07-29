{pkgs}: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.bun
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "christian-kohler.npm-intellisense"
    "christian-kohler.path-intellisense"
    "esbenp.prettier-vscode"
    "bradlc.vscode-tailwindcss"
  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "bun"  # You can choose to use either 'bun' or 'npm' here 
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
