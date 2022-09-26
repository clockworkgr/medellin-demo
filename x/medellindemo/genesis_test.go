package medellindemo_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "medellin-demo/testutil/keeper"
	"medellin-demo/testutil/nullify"
	"medellin-demo/x/medellindemo"
	"medellin-demo/x/medellindemo/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.MedellindemoKeeper(t)
	medellindemo.InitGenesis(ctx, *k, genesisState)
	got := medellindemo.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
