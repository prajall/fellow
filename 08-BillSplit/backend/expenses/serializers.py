from rest_framework import serializers
from .models import ExpenseModel
from .models import ExpenseParticipant
from groups.models import Group, GroupMember
import json

class ExpenseParticipantSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)


    class Meta:
        model = ExpenseParticipant
        fields = ['user_id', 'user_name', 'paid_amount', 'allocated_amount', 'expense_id']

    # def validate_paid_amount(self, value):
    #     if value <= 0:
    #         raise serializers.ValidationError("Paid amount must be positive")
    #     return value
    
    # def validate_allocated_amount(self, value):
    #     if value <= 0:
    #         raise serializers.ValidationError("Allocated amount must be positive")
    #     return value
    
    # def validate(self, attrs):
    #     if attrs['paid_amount'] < attrs['allocated_amount']:
    #         raise serializers.ValidationError("Paid amount must be greater than allocated amount")
    #     return attrs


class ExpenseSerializer(serializers.ModelSerializer):
    participants = ExpenseParticipantSerializer(many=True, read_only=True)
    
    class Meta:
        model = ExpenseModel
        fields = '__all__'

    
    def validate_group_id(self, value):
        try:
            print("group_id", value)
            group = Group.objects.get(id=value.id)
            # group.members.get(member=self.context.get('request').user)
            return value
    
        except Group.DoesNotExist:
            raise serializers.ValidationError("Group does not exist")

        except GroupMember.DoesNotExist:
            raise serializers.ValidationError("You are not a member of this group")
        
        except Exception as e:
            print("Error in validate group_id", e)
            raise serializers.ValidationError("Invalid group_id")
        

    # def get_queryset(self):
    #     return ExpenseModel.objects.filter(group_id=self.context['request'].query_params.get('group_id'))

            