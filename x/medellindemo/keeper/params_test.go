package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "medellin-demo/testutil/keeper"
	"medellin-demo/x/medellindemo/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.MedellindemoKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
