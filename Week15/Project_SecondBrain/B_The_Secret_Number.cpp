#include <bits/stdc++.h>
using namespace std;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int t;
    if (!(cin >> t)) return 0;
    while (t--) {
        unsigned long long n;
        cin >> n;
        vector<unsigned long long> ans;
        unsigned long long pow10 = 1;
        // try k = 1..18 (or while 10^k + 1 <= n)
        for (int k = 1; k <= 18; ++k) {
            // compute 10^k
            pow10 *= 10ULL; // pow10 = 10^k
            unsigned long long denom = pow10 + 1ULL; // 10^k + 1
            if (denom > n) break;
            if (n % denom == 0ULL) {
                unsigned long long x = n / denom;
                if (x > 0) ans.push_back(x);
            }
        }
        if (ans.empty()) {
            cout << 0 << '\n';
        } else {
            sort(ans.begin(), ans.end());
            cout << ans.size() << '\n';
            for (size_t i = 0; i < ans.size(); ++i) {
                if (i) cout << ' ';
                cout << ans[i];
            }
            cout << '\n';
        }
    }
    return 0;
}