from django import forms


class LoanForm(forms.Form):
    loan_amount = forms.DecimalField(label='대출 금액', max_digits=12, decimal_places=2)
    loan_term = forms.IntegerField(label='대출 기간 (년)', min_value=1)
    interest_rate = forms.DecimalField(label='연 이자율 (%)', max_digits=5, decimal_places=2)