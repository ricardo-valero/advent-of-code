{
  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixpkgs-unstable";
    };
    roc = {
      url = "github:roc-lang/roc";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs = {
    nixpkgs,
    roc,
    ...
  }: let
    systems = nixpkgs.lib.platforms.unix;
  in {
    formatter = nixpkgs.lib.genAttrs systems (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in
        pkgs.alejandra
    );
    devShells = nixpkgs.lib.genAttrs systems (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
        node = pkgs.nodejs_20;
        corepackEnable = pkgs.runCommand "corepack-enable" {} ''
          mkdir -p $out/bin
          ${node}/bin/corepack enable --install-directory $out/bin
        '';
        rocPkgs = roc.packages.${system};
      in {
        default = pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            (with ocamlPackages; [ocaml findlib dune_2 ocaml-lsp])
          ];
          buildInputs = with pkgs; [
            node
            corepackEnable
            bun
            python3
            (with ocamlPackages; [ocamlformat ocamlgraph])
            (with rocPkgs; [full])
          ];
          shellHook = ''
            export ROC_LSP_PATH=${rocPkgs.full}/bin/roc_language_server
          '';
        };
      }
    );
  };
}
