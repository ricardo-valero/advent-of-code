{
  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixpkgs-unstable";
    };

    flake-utils = {
      url = "github:numtide/flake-utils";
    };

    roc = {
      url = "github:roc-lang/roc";
    };
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    roc,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      rocPkgs = roc.packages.${system};
      corepackEnable = pkgs.runCommand "corepack-enable" {} ''
        mkdir -p $out/bin
        ${pkgs.nodejs}/bin/corepack enable --install-directory $out/bin
      '';
    in {
      formatter = pkgs.alejandra;

      devShells = {
        default = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            (with ocamlPackages; [ocaml findlib dune_2 ocaml-lsp])
          ];
          buildInputs = with pkgs; [
            nodejs
            corepackEnable
            bun
            python3
            (with ocamlPackages; [ocamlformat ocamlgraph])
            (with rocPkgs; [cli lang-server])
          ];
          shellHook = ''
            export ROC_LSP_PATH=${rocPkgs.lang-server}/bin/roc_ls
          '';
        };
      };
    });
}
