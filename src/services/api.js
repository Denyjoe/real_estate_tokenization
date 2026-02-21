/**
 * Stellar Real Estate API client.
 * Base URL: VITE_API_URL (e.g. http://localhost:8000)
 */

const getBaseUrl = () => import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(path, options = {}) {
  const url = `${getBaseUrl().replace(/\/$/, "")}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const text = await res.text();
  if (!res.ok) {
    let detail = text;
    try {
      const j = JSON.parse(text);
      detail = j.detail || (typeof j.detail === "string" ? j.detail : text);
    } catch (_) {}
    throw new Error(detail);
  }
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (_) {
    return text;
  }
}

/** GET issuer public key (for trustlines and display). */
export async function getIssuer() {
  return request("/issuer");
}

/** POST create a new Stellar wallet. Returns { public_key, secret_key }. New testnet accounts are auto-funded via Friendbot. */
export async function createWallet() {
  return request("/wallet/create", { method: "POST" });
}

/** POST fund an existing testnet account via Friendbot (so it appears on Stellar Expert). */
export async function fundTestnetAccount(publicKey) {
  return request("/wallet/fund-testnet", {
    method: "POST",
    body: JSON.stringify({ public_key: publicKey }),
  });
}

/** GET account balances (XLM + custom assets) from Stellar. */
export async function getBalance(publicKey) {
  return request(`/wallet/balance/${encodeURIComponent(publicKey)}`);
}

/** GET transaction history for an account. */
export async function getWalletTransactions(publicKey, limit = 20) {
  return request(`/wallet/transactions/${encodeURIComponent(publicKey)}?limit=${limit}`);
}

/** POST create trustline so account can hold the asset. */
export async function createTrustline(secretKey, assetCode, issuerPublicKey) {
  return request("/trustline/create", {
    method: "POST",
    body: JSON.stringify({
      secret_key: secretKey,
      asset_code: assetCode,
      issuer_public_key: issuerPublicKey,
    }),
  });
}

/** POST issuer issues tokens to distribution (buyer) account. Returns { success, transaction_hash }. */
export async function issueToken(assetCode, distributionPublic, amount) {
  return request("/token/issue", {
    method: "POST",
    body: JSON.stringify({
      asset_code: assetCode,
      distribution_public: distributionPublic,
      amount: Number(amount),
    }),
  });
}

/** Stellar Expert testnet transaction URL. */
export function stellarExpertTxUrl(transactionHash) {
  if (!transactionHash) return "";
  return `https://stellar.expert/explorer/testnet/tx/${transactionHash}`;
}

/** Stellar Expert testnet account URL (view balance, transactions, link wallet to site). */
export function stellarExpertAccountUrl(publicKey) {
  if (!publicKey) return "";
  return `https://stellar.expert/explorer/testnet/account/${publicKey}`;
}

export default {
  getBaseUrl,
  getIssuer,
  createWallet,
  fundTestnetAccount,
  getBalance,
  getWalletTransactions,
  createTrustline,
  issueToken,
  stellarExpertTxUrl,
  stellarExpertAccountUrl,
};
